package com.example.blogs.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.blogs.exception.ResourceNotFoundException;
import com.example.blogs.model.BlogPost;
import com.example.blogs.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Long id) {
        BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));
        return ResponseEntity.ok(post);
    }

    // POST create a new blog post
    @PostMapping
    public BlogPost createBlogPost(@RequestBody BlogPost blogPost) {
        // Set the current date/time as createdAt if not provided
        if (blogPost.getCreatedAt() == null || blogPost.getCreatedAt().isEmpty()) {
            blogPost.setCreatedAt(LocalDateTime.now().toString());
        }
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
