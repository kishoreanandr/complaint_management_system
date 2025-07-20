package com.kishore.complaintsystem.service;

import com.kishore.complaintsystem.entity.Complaint;
import com.kishore.complaintsystem.entity.User;
import com.kishore.complaintsystem.repository.ComplaintRepository;
import com.kishore.complaintsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    public Complaint submitComplaint(Complaint complaint, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        complaint.setUser(user);
        return complaintRepository.save(complaint);
    }


    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public List<Complaint> getComplaintsByUser(String userEmail) {
        return complaintRepository.findByUserEmail(userEmail);
    }

    public Complaint updateStatus(int id, Complaint.Status status) {
        Complaint complaint = complaintRepository.findById(id).orElseThrow();
        complaint.setStatus(status);
        return complaintRepository.save(complaint);
    }

    public void deleteComplaint(int id) {
        if (!complaintRepository.existsById(id)) {
            throw new NoSuchElementException("Complaint not found with ID: " + id);
        }
        complaintRepository.deleteById(id);
    }

}
