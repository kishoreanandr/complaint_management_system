package com.kishore.complaintsystem.controller;

import com.kishore.complaintsystem.dto.ComplaintRequest;
import com.kishore.complaintsystem.entity.Complaint;
import com.kishore.complaintsystem.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService service;

    @PostMapping("/")
    public ResponseEntity<Complaint> submitComplaint(@RequestBody ComplaintRequest request) {
        Complaint complaint = Complaint.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .status(Complaint.Status.PENDING)
                .build();

        return ResponseEntity.ok(service.submitComplaint(complaint, request.getUserEmail()));
    }


    @GetMapping("/")
    public List<Complaint> getAllComplaints() {
        return service.getAllComplaints();
    }

    @GetMapping("/student/{email}")
    public List<Complaint> getByUser(@PathVariable String email) {
        return service.getComplaintsByUser(email);
    }


    @PutMapping("/status/{id}")
    public ResponseEntity<Complaint> updateStatus(@PathVariable int id, @RequestBody Map<String, String> body) {
        Complaint.Status newStatus = Complaint.Status.valueOf(body.get("status"));
        return ResponseEntity.ok(service.updateStatus(id, newStatus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComplaint(@PathVariable int id) {
        service.deleteComplaint(id);
        return ResponseEntity.ok().build();
    }
}
