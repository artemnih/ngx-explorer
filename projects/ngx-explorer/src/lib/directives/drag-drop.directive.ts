import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[nxeDragDrop]'
})
export class DragDropDirective {
  @Output() dragEnter = new EventEmitter<any>();
  @Output() dragOver = new EventEmitter<any>();
  @Output() dragLeave = new EventEmitter<any>();
  @Output() dragDropped = new EventEmitter<any>();

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragEnter.emit(event);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.emit(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragLeave.emit(event);
  }

  @HostListener('dragdrop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.dragDropped.emit(files);
    }
  }
}