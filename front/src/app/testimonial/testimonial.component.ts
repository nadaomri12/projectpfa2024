import { Component, OnInit , NgModule } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';

@Component({
  selector: 'app-testimonial', 
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'], 
  
})

export class TestimonialComponent implements OnInit  {
  Review: any = {
    message: '',
    author: '',
    authoremail: ''
  };

  slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  
  constructor(private Service: SerrviceService) {}

  getReview() {
    this.Service.getReview().subscribe(
      (data) => {
        this.Review = data;
      },
      (error) => {
        console.error('Error getting review data', error);
      }
    );
  }

  ngOnInit() {
    this.getReview();
  }
}
