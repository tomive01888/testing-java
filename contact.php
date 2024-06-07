<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = strip_tags(trim($_POST["fname"]));
    $lastName = strip_tags(trim($_POST["lname"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    if (empty($firstName) || empty($lastName) || empty($email) || empty($subject) || empty($message)) {
        echo "Please fill in all required fields.";
        exit;
    }

    // Mailchimp API URL
    $url = 'https://us14.api.mailchimp.com/3.0/lists/<YOUR-LIST-ID>/members/';

    // Your Mailchimp API Key
    $apiKey = '858e72e9e3ff2add63678df9e34dfd59-us14';

    // Data to be sent to Mailchimp
    $data = [
        'email_address' => $email,
        'status' => 'subscribed',
        'merge_fields' => [
            'FNAME' => $firstName,
            'LNAME' => $lastName,
            'SUBJECT' => $subject,
            'MESSAGE' => $message
        ]
    ];

    // cURL request to Mailchimp
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode == 200) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    echo "There was a problem with your submission. Please try again.";
}
?>
