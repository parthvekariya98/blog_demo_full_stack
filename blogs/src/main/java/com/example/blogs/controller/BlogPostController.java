package com.example.blogs.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.blogs.exception.ResourceNotFoundException;
import com.example.blogs.model.BlogPost;
import com.example.blogs.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/blog/posts")
public class BlogPostController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    // GET all blog posts
    @GetMapping
    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }

    // POST create a new blog post
    @PostMapping
    public BlogPost createBlogPost(@RequestBody BlogPost blogPost) {
        return blogPostRepository.save(blogPost);
    }

    // PUT update an existing blog post
    @PutMapping("/{id}")
    public BlogPost updateBlogPost(@PathVariable Long id, @RequestBody BlogPost updatedPost) {
        BlogPost existingPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));

        existingPost.setTitle(updatedPost.getTitle());
        existingPost.setContent(updatedPost.getContent());
        existingPost.setCreatedAt(updatedPost.getCreatedAt());

        return blogPostRepository.save(existingPost);
    }

    // DELETE delete an existing blog post
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlogPost(@PathVariable Long id) {
        BlogPost existingPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));

        blogPostRepository.delete(existingPost);

        return ResponseEntity.ok().build();
    }
}
