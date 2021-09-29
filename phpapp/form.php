<?php

$to = "shalinidpi638@gmail.com, info@businessfirst.com.mt, derek.damato@businessfirst.com.mt, ashutosh.jakhotra@ladybirdweb.com";
    
    
    $name = $_REQUEST['name'];
    $surname = $_REQUEST['surname'];
    $email = $_REQUEST['email'];
    $nationality = $_REQUEST['nationality'];
    $department = $_REQUEST['department'];
    $subject1 = $_REQUEST['subject1'];
    $business= $_REQUEST['business'];
    $com= $_REQUEST['com'];
    
    
    

    $headers = "From: Contact Us Form";
    $headers = "From: $email; "  . "\r\n";
    $headers .= "Reply-To: ". "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    $subject = "Business 1st Form";

    $body = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title></title>Business 1st Form</head><body>";
    $body .= "</td></tr></thead><tbody><tr>";
    $body .= "<td style='border:none;'><strong>Name:</strong> {$name}</td>";
    $body .= "</tr>";
    $body .= "<td style='border:none;'><strong>Surname:</strong> {$surname}</td>";
    $body .= "</tr>";
    
    $body .= "</tr>";
    $body .= "<tr><td style='border:none;'><strong>Nationality:</strong> {$nationality}</td></tr>";
    $body .= "<tr><td></td></tr>";
    $body .= "<tr><td style='border:none;'><strong>Department:</strong> {$department}</td></tr>";
    $body .= "<tr><td style='border:none;'><strong>Subject Queries:</strong> {$subject1}</td></tr>";
    $body .= "<tr><td style='border:none;'><strong>Business Type:</strong> {$business}</td></tr>";
    $body .= "<tr><td style='border:none;'><strong>Comment:</strong> {$com}</td></tr>";
    $body .= "<tr><td></td></tr>";
    $body .= "</tbody></table>";
    $body .= "</body></html>";

    if( mail($to, $subject, $body, $headers))
    
      {
         echo "<script type='text/javascript'>
        window.location.href ='thankyou.html';
        </script>";
      }
      
      
      else
    {
     echo "<script type='text/javascript'>alert('Your Request can't be Sent!');
    window.location.href ='form.html';
    </script>";
    }

    ?>
