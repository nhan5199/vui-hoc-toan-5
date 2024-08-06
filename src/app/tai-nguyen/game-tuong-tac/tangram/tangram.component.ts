import { AfterViewInit, Component, OnInit } from '@angular/core';

import Konva from 'konva';
import { ShapeInfoComponent } from './shape-info/shape-info.component';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-tangram',
  standalone: true,
  imports: [ShapeInfoComponent, CommonModule],
  templateUrl: './tangram.component.html',
  styleUrl: './tangram.component.css',
})
export class TangramComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;

  isPhoneAndOrientation: boolean = false;
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  tr!: Konva.Transformer;
  selectionRectangle!: Konva.Rect;
  shapes: Konva.Shape[] = [];
  x1: number | undefined;
  y1: number | undefined;
  x2: number | undefined;
  y2: number | undefined;

  width = window.innerWidth;
  height = window.innerHeight;

  selectedPic: number = 1;
  picUrl: string = '';

  isDisplayInfo: boolean = false;

  constructor(private readonly _location: Location) {
    this.picUrl = `/assets/imgs/puzzle/${this.selectedPic}.png`;
  }

  ngOnInit(): void {
    if (window.screen.width < 800) {
      if (window.orientation === 90 || window.orientation === -90) {
        let flipbook = document.getElementById('flipbook');
        if (flipbook) {
          flipbook.style.display = 'flex';
        }
        this.isPhoneAndOrientation = false;
      } else {
        let flipbook = document.getElementById('flipbook');
        if (flipbook) {
          flipbook.style.display = 'none';
        }
        this.isPhoneAndOrientation = true;
      }
    }
  }

  ngAfterViewInit(): void {
    this.stage = new Konva.Stage({
      container: 'container',
      width: this.width,
      height: this.height,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.tr = new Konva.Transformer();
    this.layer.add(this.tr);

    this.selectionRectangle = new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
      visible: false,
    });
    this.layer.add(this.selectionRectangle);

    this.stage.on('mousedown touchstart', (e: any) => this.handleMouseDown(e));
    this.stage.on('mousemove touchmove', (e: any) => this.handleMouseMove(e));
    this.stage.on('mouseup touchend', (e: any) => this.handleMouseUp(e));
    this.stage.on('click tap', (e: any) => this.handleClick(e));

    this.isLoading = false;
  }

  handleMouseDown(e: any) {
    if (e.target !== this.stage) {
      return;
    }
    e.evt.preventDefault();
    const pointerPos = this.stage.getPointerPosition();
    if (pointerPos) {
      this.x1 = pointerPos.x;
      this.y1 = pointerPos.y;
      this.x2 = pointerPos.x;
      this.y2 = pointerPos.y;

      this.selectionRectangle.visible(true);
      this.selectionRectangle.width(0);
      this.selectionRectangle.height(0);
    }
  }

  handleMouseMove(e: any) {
    if (!this.selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();
    const pointerPos = this.stage.getPointerPosition();
    if (pointerPos) {
      this.x2 = pointerPos.x;
      this.y2 = pointerPos.y;

      this.selectionRectangle.setAttrs({
        x: Math.min(this.x1!, this.x2!),
        y: Math.min(this.y1!, this.y2!),
        width: Math.abs(this.x2! - this.x1!),
        height: Math.abs(this.y2! - this.y1!),
      });
    }
  }

  handleMouseUp(e: any) {
    if (!this.selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();
    setTimeout(() => {
      this.selectionRectangle.visible(false);
    });

    const box = this.selectionRectangle.getClientRect();
    const selected = this.shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    this.tr.nodes(selected);
  }

  handleClick(e: any) {
    if (this.selectionRectangle.visible()) {
      return;
    }

    if (e.target === this.stage) {
      this.tr.nodes([]);
      return;
    }

    if (!e.target.hasName('shape')) {
      return;
    }

    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = this.tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      this.tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      const nodes = this.tr.nodes().slice();
      nodes.splice(nodes.indexOf(e.target), 1);
      this.tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      const nodes = this.tr.nodes().concat([e.target]);
      this.tr.nodes(nodes);
    }
  }

  addRectangle(x: number, y: number) {
    const rectangle = new Konva.Rect({
      x,
      y, // Adjust the y-coordinate for the desired position on top
      width: 100,
      height: 80,
      fill: 'red',
      name: 'shape',
      draggable: true,
    });
    this.layer.add(rectangle);
    this.shapes.push(rectangle);
  }

  addSquare(x: number, y: number) {
    // Create a Konva.Rect for the square
    const square = new Konva.Rect({
      x,
      y,
      width: 80, // Width and height are the same to make it a square
      height: 80,
      fill: 'purple', // Fill color
      name: 'shape',
      draggable: true,
    });

    this.layer.add(square);
    this.shapes.push(square);
  }

  addTrapezoid(x: number, y: number) {
    // Define the coordinates for the vertices of the trapezoid
    const points = [
      x,
      y, // Vertex 1 (top-left)
      x + 80,
      y, // Vertex 2 (top-right)
      x + 130,
      y + 80, // Vertex 3 (bottom-right)
      x + -50,
      y + 80, // Vertex 4 (bottom-left)
    ];

    // Create a Konva.Line to draw the trapezoid
    const trapezoid = new Konva.Line({
      points: points,
      closed: true, // Close the path to create a filled trapezoid
      fill: 'orange', // Fill color
      name: 'shape',
      draggable: true,
    });

    this.layer.add(trapezoid);
    this.shapes.push(trapezoid);
  }

  addTriangle(x: number, y: number) {
    const triangle = new Konva.RegularPolygon({
      x,
      y,
      sides: 3,
      radius: 50,
      fill: 'blue',
      name: 'shape',
      draggable: true,
    });
    this.layer.add(triangle);
    this.shapes.push(triangle);
  }

  addLeftAngleTriangle(x: number, y: number) {
    // Define the coordinates for the vertices of the left-angled triangle
    const points = [
      x,
      y, // Vertex 1 (top)
      x,
      y + 80, // Vertex 2 (left)
      x + 80,
      y + 80, // Vertex 3 (bottom)
    ];

    // Create a Konva.Line to draw the left-angled triangle
    const triangle = new Konva.Line({
      points: points,
      closed: true, // Close the path to create a filled triangle
      fill: '#38DDC4', // Fill color
      name: 'shape',
      draggable: true,
    });

    this.layer.add(triangle);
    this.shapes.push(triangle);
  }

  addCircle(x: number, y: number) {
    const circle = new Konva.Circle({
      x,
      y, // Adjust the y-coordinate for the desired position on top
      radius: 40,
      fill: 'yellow',
      name: 'shape',
      draggable: true,
    });
    this.layer.add(circle);
    this.shapes.push(circle);
  }

  deleteSelected() {
    const selectedNodes = this.tr.nodes();
    selectedNodes.forEach((node: any) => {
      // Ensure the node is a Konva.Shape before attempting to remove
      if (node instanceof Konva.Shape) {
        // Remove the shape from the Konva layer
        node.remove();
        // Remove the shape from the array that tracks shapes
        const index = this.shapes.indexOf(node);
        if (index !== -1) {
          this.shapes.splice(index, 1);
        }
      }
    });

    // Clear the transformer selection
    this.tr.nodes([]);
    // Batch draw to update the stage
    this.layer.batchDraw();
  }

  clearAllShapes() {
    // Iterate through the array of shapes
    this.shapes.forEach((shape) => {
      // Remove the shape from the Konva layer
      shape.remove();
    });

    // Clear the array of shapes
    this.shapes = [];

    // Clear the transformer selection
    this.tr.nodes([]);

    // Batch draw to update the stage
    this.layer.batchDraw();
  }

  onChangePic() {
    this.clearAllShapes();

    this.selectedPic += 1;
    if (this.selectedPic > 10) this.selectedPic = 1;
    this.picUrl = `images/images/puzzle/${this.selectedPic}.png`;
  }

  returnToBackPage() {
    this._location.back();
  }

  onOpenInfoPopup() {
    this.isDisplayInfo = true;
  }

  onCloseInfoPopup(event: boolean) {
    if (event) this.isDisplayInfo = false;
  }
}
