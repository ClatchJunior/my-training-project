<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require_once 'php/src/Exception.php';
    require_once 'php/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'php/language/');
    $mail->isSMTP();
    $mail->SMTPAuth   = true;
    $mail->IsHTML(true);

    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'citycab.info'; // Логин на почте
    $mail->Password   = 'voszogniehzuedzo'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465; 
    $mail->setFrom('citycab.info@yandex.ru', 'Заявка');
    $mail->addAddress('gahama1187@hyprhost.com');
    $mail->addAddress('igor.shop_game@mail.ru');
    /* $mail->addAddress('CityCab.central@gmail.com'); */
    $mail->Subject = 'Заявка обратного звонка';


    $body = '<h1>Заявка</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['tel']))){
        $body.='<p><strong>Телефон: </strong> '.$_POST['tel'].'</p>';
    }
    if(!empty($_FILES['image']['tmp_name'])) {
        $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];

        if(copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p><strong>Фото в приложении</strong>';
            $mail->addAttachment($fileAttach);
        }
    }
    if(!empty($_FILES['image2']['tmp_name'])) {
        $filePath = __DIR__ . "/files/" . $_FILES['image2']['name'];

        if(copy($_FILES['image2']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p><strong>Фото в приложении</strong>';
            $mail->addAttachment($fileAttach);
        }
    }
    if(!empty($_FILES['image3']['tmp_name'])) {
        $filePath = __DIR__ . "/files/" . $_FILES['image3']['name'];

        if(copy($_FILES['image3']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p><strong>Фото в приложении</strong>';
            $mail->addAttachment($fileAttach);
        }
    }
    if(!empty($_FILES['image4']['tmp_name'])) {
        $filePath = __DIR__ . "/files/" . $_FILES['image4']['name'];

        if(copy($_FILES['image4']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p><strong>Фото в приложении</strong>';
            $mail->addAttachment($fileAttach);
        }
    }


    $mail->Body = $body;

    if (!$mail->send()) {
        $message = 'ОШИБКА';
    } else {
        $message = 'Спасибо за заявку! Мы вам перезвоним!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>