# used to send test emails

$smtp = "localhost" 
$to = "Test To <administrator@office15r2.dev>" 
$from = "Test From <sharepoint@office15r2.dev>" 
$subject = "This is a Test of HTML Email"  
$body = "Dear <b><font color=red>$to</b></font> <br>" 
$body += "We are testing <b>HTML</b> email <br>" 
$body += "Click <a href=http://www.google.com>here</a> to open google <br>" 
 
Send-MailMessage -SmtpServer $smtp -To $to -From $from -Subject $subject -Body $body -BodyAsHtml -Priority high -UseSsl:$false