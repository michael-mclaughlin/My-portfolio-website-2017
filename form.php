<?php 
// Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Get the form fields and remove whitespace.
        $fullName = strip_tags(trim($_POST["fullName"]));
			$fullName = str_replace(array("\r","\n"),array(" "," "),$fullName);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $subject = strip_tags(trim($_POST["subject"]));
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if (empty($fullName) OR empty($subject) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "Oops! Wrong info.";
            exit;
        }

        $recipient = "michaelmclaughlindesigns@yahoo.com";

        $subject = "$subject";

        // Build the email content.
        $email_content = "My name is $fullName.\n";
        $email_content .="I would like to talk to you about $subject.\n";
        $email_content .= "My email is $email.\n\n";
        $email_content .= "$message\n";

        // Build the email headers.
        $email_headers = "From: $fullName <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            http_response_code(200);
            echo "Thanks! We'll talk soon.";
        } else {
            http_response_code(500);
            echo "Stupid server! Try Again.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Oops! Forbidden request.";
    }
?>

