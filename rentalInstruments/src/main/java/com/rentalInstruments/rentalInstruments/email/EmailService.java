package com.rentalInstruments.rentalInstruments.email;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService implements EmailSender {

    @Autowired
    private  JavaMailSender mailSender;

    @Override
    @Async
    public void send(String to, String email) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage , "utf-8");
            helper.setText(email , true);
            helper.setTo(to);
            helper.setSubject("Gracias por registrarte");
            helper.setFrom("pitchpleasse@gmail.com");
            mailSender.send(mimeMessage);
        } catch (MessagingException e){
            log.error("Failed to send email " + e);
            throw new IllegalStateException(("Failed to send email"));
        }
    }
}
