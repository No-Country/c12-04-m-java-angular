import { NgModule } from '@angular/core';
// import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material.module';

@NgModule({
	declarations: [],
	imports: [
		ReactiveFormsModule,
		MaterialModule,
		// ToastrModule.forRoot({
		// 	timeOut: 6000, // 6 seconds
		// 	closeButton: true,
		// 	progressBar: true,
		// }),
	],
	exports: [ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
