import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null
  inSubmission = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Updating clip.'
  @Output() update = new EventEmitter()

  editForm = new FormGroup({
    id: new FormControl('', {
      nonNullable: true
    }),
    title: new FormControl('', [
      Validators.required, Validators.minLength(3)
    ])
  })

  constructor(private modal: ModalService, private clipService: ClipService) {}

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) return

    this.inSubmission = false
    this.showAlert = false
    this.editForm.setValue({
      id: this.activeClip.docID as string,
      title: this.activeClip.title
    })
  }

  async submit() {
    if (!this.activeClip) {
      return
    }

    this.inSubmission = true
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Updating clip.'

    if (this.editForm.invalid) {
      this.alertColor = 'red'
      this.alertMsg = 'Please fill the form first.'
      this.inSubmission = false
      return
    }

    try {
      await this.clipService.updateClip(
        this.editForm.value.id as string, this.editForm.value.title as string
      )
    } catch(e) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'Something went wrong. Try again later'
      return
    }

    this.activeClip.title = this.editForm.value.title as string
    this.update.emit(this.activeClip)
    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = 'Success!'
    setTimeout(() => {
      this.modal.toogleModal('editClip')
    }, 1000)
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }
}
