<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Forgot Password – Valence 2</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #4e54c8, #8f94fb);
            color: #333;
            display: flex;
            justify-content: center;
            align-items: start;
            min-height: 100vh;
            padding: 5vh 2rem;
        }

        .container {
            background: #fff;
            padding: 2.5rem 2rem;
            border-radius: 16px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: #4e54c8;
        }

        p {
            margin-bottom: 1.5rem;
            font-size: 1rem;
            color: #555;
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        label {
            text-align: left;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }

        input[type="email"] {
            padding: 0.8rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        button {
            background-color: #4e54c8;
            color: #fff;
            border: none;
            padding: 0.8rem 1.2rem;
            font-size: 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.3s;
        }

        button:hover {
            background-color: #3c3fa1;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>🔑 Forgot Password</h1>
    <p>Enter your email address and we’ll send you a link to reset your password.</p>
    
    <form method="post" action="send-password-reset.php">
        <label for="email">Email Address</label>    
        <input type="email" name="email" id="email" required>

        <button type="submit">📩 Send Reset Link</button>
    </form>
</div>

</body>
</html>