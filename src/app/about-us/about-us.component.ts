import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  profiles: Profile[] = [
    {
      id: 1,
      name: 'Mateo KcKee',
      bio: 'Bio here',
      role: 'Web Development Team Lead',
      linkedInUrl: 'https://www.linkedin.com/in/mateo-mckee/',
      imageUrl: '/assets/images/Profile Images/Mateo.jpg',
    },
    {
      id: 2,
      name: 'Michael De Leon',
      bio: 'Bio here',
      role: 'Web Developer',
      linkedInUrl: 'www.linkedin.com/in/michael-de-leon-61196421b',
      imageUrl: '/assets/images/Profile Images/Default.jpg',
    },
    {
      id: 3,
      name: 'Nicholas  Soto',
      bio: 'Bio here',
      role: 'Web Developer',
      linkedInUrl: 'https://www.linkedin.com/in/nick4soto/',
      imageUrl: '/assets/images/Profile Images/Nick.jpg',
    },
    {
      id: 4,
      name: 'Joshua Zamora',
      bio: 'Bio here',
      role: 'Web Developer',
      linkedInUrl: 'www.linkedin.com/in/michael-de-leon-61196421b',
      imageUrl: '/assets/images/Profile Images/Default.jpg',
    },
    {
      id: 5,
      name: 'Otto Zoesch-Weigel',
      bio: 'Bio here',
      role: 'Data Science Team Lead',
      linkedInUrl: 'https://www.linkedin.com/in/otto-zoesch-weigel-a66595283/',
      imageUrl: '/assets/images/Profile Images/Otto.jpg',
    },
    {
      id: 6,
      name: 'Christian Hockley',
      bio: 'Bio here',
      role: 'Data Scientist',
      linkedInUrl: 'https://www.linkedin.com/in/christian-hockley-236a05299/',
      imageUrl: '/assets/images/Profile Images/Christian.jpg',
    },
    {
      id: 7,
      name: 'Braulio Hurtado',
      bio: 'Bio here',
      role: 'Data Scientist',
      linkedInUrl: 'https://www.linkedin.com/in/braulio-h/',
      imageUrl: '/assets/images/Profile Images/Braulio.jpg',
    },
    {
      id: 8,
      name: 'Ethan Fernandez',
      bio: 'Bio here',
      role: 'Manager',
      linkedInUrl: 'https://www.linkedin.com/in/ethan-fernandez-13487624b/',
      imageUrl: '/assets/images/Profile Images/Ethan.jpg',
    },
    {
      id: 9,
      name: 'Reese',
      bio: 'Bio here',
      role: 'Manager',
      linkedInUrl: 'https://www.linkedin.com/',
      imageUrl: '/assets/images/Profile Images/Default.jpg',
    },
  ];
  selectedProfile: Profile | null = null;

  constructor() {}

  ngOnInit(): void {
  }

  selectProfile(profileId: number): void {
    this.selectedProfile = this.profiles.find(profile => profile.id === profileId) || null;
  }
}
