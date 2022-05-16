import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogEntry } from 'src/app/BlogEntry';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css'],
})
export class BlogHomeComponent implements OnInit {
  blogEntries?: BlogEntry[];
  editEntry?: BlogEntry | null;
  deleteEntry?: BlogEntry | null;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.getAllBlogEntries();
  }

  public onAddNewBlog(addForm: NgForm): void {
    // click close button
    document.getElementById('add-close')?.click();

    this.blogService.addNewBlogEntry(addForm.value).subscribe({
      next: (response) => {
        this.getAllBlogEntries();
        addForm.reset();
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public getAllBlogEntries(): void {
    this.blogService.getAllBlogEntries().subscribe({
      next: (response) => {
        this.blogEntries = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public editBlogEntry(editForm: NgForm): void {
    document.getElementById("edit-close")?.click();
    this.blogService.updateBlogEntry(editForm.value).subscribe({
      next: (response) => {
        this.getAllBlogEntries();
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public deleteBlogEntry(blogId: number): void {
    document.getElementById("delete-close")?.click();
    this.blogService.deleteBlogEntry(String(blogId)).subscribe({
      next: (response) => {
        this.getAllBlogEntries();
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public onOpenModal(entry: BlogEntry | null, role: string): void {
    // select parent div
    const parent = document.getElementsByTagName('nav')[0];

    // create button to open modal
    const openModalBtn = document.createElement('button');
    openModalBtn.style.display = 'none';
    openModalBtn.setAttribute('data-bs-toggle', 'modal');

    if (role == 'add') {
      openModalBtn.setAttribute('data-bs-target', '#addModal');
    } else if (role == 'edit') {
      openModalBtn.setAttribute('data-bs-target', '#editModal');
      this.editEntry = entry;
    } else if ((role = 'delete')) {
      openModalBtn.setAttribute('data-bs-target', '#deleteModal');
      this.deleteEntry = entry;
    }

    parent.appendChild(openModalBtn);
    openModalBtn.click();
  }
}
