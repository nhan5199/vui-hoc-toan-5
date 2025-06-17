import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-bai-doc-360-popup',
  standalone: true,
  imports: [],
  templateUrl: './bai-doc-360-popup.component.html',
  styleUrl: './bai-doc-360-popup.component.css',
})
export class BaiDoc360PopupComponent implements OnChanges, OnDestroy {
  @ViewChild('viewer') viewerRef!: ElementRef;
  @Input() displayPopup: boolean = false;
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() imgUrl: string = '';
  @Input() description: string = '';
  @Input() title: string = '';

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private isUserInteracting = false;
  private onPointerDownPointerX = 0;
  private onPointerDownPointerY = 0;

  private lon = 0;
  private lat = 0;
  private phi = 0;
  private theta = 0;
  private animationFrameId: any;

  private targetLon = 0;
  private targetLat = 0;

  ngAfterViewInit(): void {
    if (this.imgUrl) {
      this.initScene(this.imgUrl);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imgUrl'] && !changes['imgUrl'].firstChange) {
      this.disposeRenderer();
      if (this.imgUrl) {
        this.initScene(this.imgUrl);
      }
    }
  }

  ngOnDestroy(): void {
    this.disposeRenderer();
  }

  private disposeRenderer(): void {
    cancelAnimationFrame(this.animationFrameId);
    if (this.renderer) {
      this.renderer.dispose();
      const canvas = this.renderer.domElement;
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    }
  }

  initScene(imgUrl: string): void {
    const container = this.viewerRef.nativeElement;
    const padding = 0;

    const width = container.clientWidth - padding;
    const height = container.clientHeight - padding;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.domElement.style.borderRadius = '12px'; // optional
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    this.camera.position.set(0, 0, 0);

    this.scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const texture = new THREE.TextureLoader().load(imgUrl, () => {
      this.animate();
    });

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    const canvas = this.renderer.domElement;
    canvas.addEventListener('mousedown', this.onPointerDown.bind(this), false);
    canvas.addEventListener('mousemove', this.onPointerMove.bind(this), false);
    canvas.addEventListener(
      'mouseup',
      () => (this.isUserInteracting = false),
      false
    );
    canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);
    canvas.addEventListener('touchmove', this.onTouchMove.bind(this), false);
    canvas.addEventListener(
      'touchend',
      () => (this.isUserInteracting = false),
      false
    );

    container.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      this.camera.fov += e.deltaY * 0.05;
      this.camera.fov = THREE.MathUtils.clamp(this.camera.fov, 30, 100);
      this.camera.updateProjectionMatrix();
    });

    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth - padding;
      const newHeight = container.clientHeight - padding;
      this.camera.aspect = newWidth / newHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(newWidth, newHeight);
    });
  }

  onPointerDown(event: MouseEvent): void {
    this.isUserInteracting = true;
    this.onPointerDownPointerX = event.clientX;
    this.onPointerDownPointerY = event.clientY;
    this.targetLon = this.lon;
    this.targetLat = this.lat;
  }

  onPointerMove(event: MouseEvent): void {
    if (this.isUserInteracting) {
      const deltaX = event.clientX - this.onPointerDownPointerX;
      const deltaY = event.clientY - this.onPointerDownPointerY;
      this.lon += deltaX * 0.1;
      this.lat -= deltaY * 0.1;
      this.onPointerDownPointerX = event.clientX;
      this.onPointerDownPointerY = event.clientY;
    }
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.isUserInteracting = true;
      const touch = event.touches[0];
      this.onPointerDownPointerX = touch.clientX;
      this.onPointerDownPointerY = touch.clientY;
      this.targetLon = this.lon;
      this.targetLat = this.lat;
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (this.isUserInteracting && event.touches.length === 1) {
      event.preventDefault();
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.onPointerDownPointerX;
      const deltaY = touch.clientY - this.onPointerDownPointerY;
      this.lon += deltaX * 0.1;
      this.lat -= deltaY * 0.1;
      this.onPointerDownPointerX = touch.clientX;
      this.onPointerDownPointerY = touch.clientY;
    }
  }

  animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);

    const x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    const y = 500 * Math.cos(this.phi);
    const z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(x, y, z);
    this.renderer.render(this.scene, this.camera);
  }

  onClosePopup(): void {
    this.closePopup.emit(true);
  }
}
