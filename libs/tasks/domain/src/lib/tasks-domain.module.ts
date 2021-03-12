import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletePipe } from './pipes/complete.pipe';
import { ArtificialPaginatorPipe } from './pipes/artificial-paginator.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CompletePipe, ArtificialPaginatorPipe],
  exports: [CompletePipe, ArtificialPaginatorPipe]
})
export class TasksDomainModule {}
