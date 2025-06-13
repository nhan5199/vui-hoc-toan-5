import { Component } from '@angular/core';
import { BaiDocPopupComponent } from './bai-doc-popup/bai-doc-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bai-doc',
  standalone: true,
  imports: [BaiDocPopupComponent, CommonModule],
  templateUrl: './bai-doc.component.html',
  styleUrl: './bai-doc.component.css',
})
export class BaiDocComponent {
  displayPopup: boolean = false;

  onClick() {
    this.displayPopup = true;
  }

  onClosePopup() {
    this.displayPopup = false;
  }
}

// import { Component, ElementRef, ViewChild } from '@angular/core';
// import * as THREE from 'three';

// @Component({
//   selector: 'app-bai-doc',
//   standalone: true,
//   imports: [],
//   templateUrl: './bai-doc.component.html',
//   styleUrl: './bai-doc.component.css',
// })
// export class BaiDocComponent {
//   @ViewChild('viewer') viewerRef!: ElementRef;

//   private scene!: THREE.Scene;
//   private camera!: THREE.PerspectiveCamera;
//   private renderer!: THREE.WebGLRenderer;

//   private isUserInteracting = false;
//   private onPointerDownPointerX = 0;
//   private onPointerDownPointerY = 0;
//   private onPointerDownLon = 0;
//   private onPointerDownLat = 0;

//   private lon = 0;
//   private lat = 0;
//   private phi = 0;
//   private theta = 0;
//   private textureLoaded = false;
//   private animationFrameId: any;

//   private targetLon = 0;
//   private targetLat = 0;

//   ngAfterViewInit(): void {
//     this.initScene();
//     this.animate();
//   }

//   ngOnDestroy(): void {
//     cancelAnimationFrame(this.animationFrameId);
//     this.renderer.dispose();
//   }

//   initScene(): void {
//     const container = this.viewerRef.nativeElement;

//     this.camera = new THREE.PerspectiveCamera(
//       75,
//       container.clientWidth / container.clientHeight,
//       1,
//       1100
//     );
//     this.camera.position.set(0, 0, 0);
//     this.scene = new THREE.Scene();

//     const geometry = new THREE.SphereGeometry(500, 60, 40);
//     geometry.scale(-1, 1, 1);

//     const texture = new THREE.TextureLoader().load(
//       'images/images/bai-doc/360-image.jpg',
//       () => {
//         this.textureLoaded = true;
//         this.animate(); // Start animation AFTER image loads
//       }
//     );

//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     const mesh = new THREE.Mesh(geometry, material);
//     this.scene.add(mesh);

//     this.renderer = new THREE.WebGLRenderer();
//     this.renderer.setSize(container.clientWidth, container.clientHeight);
//     container.appendChild(this.renderer.domElement);

//     // Mouse Events
//     container.addEventListener(
//       'mousedown',
//       this.onPointerDown.bind(this),
//       false
//     );
//     window.addEventListener('mousemove', this.onPointerMove.bind(this), false);
//     window.addEventListener(
//       'mouseup',
//       () => (this.isUserInteracting = false),
//       false
//     );

//     // Wheel Zoom
//     container.addEventListener('wheel', (e: WheelEvent) => {
//       e.preventDefault();
//       this.camera.fov += e.deltaY * 0.05;
//       this.camera.fov = THREE.MathUtils.clamp(this.camera.fov, 30, 100);
//       this.camera.updateProjectionMatrix();
//     });

//     // Resize
//     window.addEventListener('resize', () => {
//       this.camera.aspect = container.clientWidth / container.clientHeight;
//       this.camera.updateProjectionMatrix();
//       this.renderer.setSize(container.clientWidth, container.clientHeight);
//     });
//   }

//   onPointerDown(event: MouseEvent): void {
//     this.isUserInteracting = true;
//     this.onPointerDownPointerX = event.clientX;
//     this.onPointerDownPointerY = event.clientY;
//     this.targetLon = this.lon;
//     this.targetLat = this.lat;
//   }

//   onPointerMove(event: MouseEvent): void {
//     if (this.isUserInteracting) {
//       const deltaX = event.clientX - this.onPointerDownPointerX;
//       const deltaY = event.clientY - this.onPointerDownPointerY;

//       this.lon += deltaX * 0.1; // Horizontal drag
//       this.lat -= deltaY * 0.1; // Vertical drag (invert for intuitive behavior)

//       this.onPointerDownPointerX = event.clientX;
//       this.onPointerDownPointerY = event.clientY;
//     }
//   }

//   animate(): void {
//     this.animationFrameId = requestAnimationFrame(() => this.animate());

//     // Clamp lat between -85 and 85 degrees to avoid flipping
//     this.lat = Math.max(-85, Math.min(85, this.lat));

//     // Convert to spherical coordinates
//     this.phi = THREE.MathUtils.degToRad(90 - this.lat);
//     this.theta = THREE.MathUtils.degToRad(this.lon);

//     const x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
//     const y = 500 * Math.cos(this.phi);
//     const z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

//     this.camera.lookAt(x, y, z);

//     this.renderer.render(this.scene, this.camera);
//   }
// }
