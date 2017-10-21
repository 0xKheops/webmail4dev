# used to send test emails

$smtp = "localhost" 
$to = "Test To <administrator@office15r2.dev>" 
$from = "Test From <sharepoint@office15r2.dev>" 
$subject = "This is a Test of HTML Email"  
$body = "Dear <b><font color=red>$to</b></font> <br>" 
$body += "We are testing <b>HTML</b> email <br>" 
$body += "Click <a href=http://www.google.com>here</a> to open google <br>" 

$randomPeon1 = "Luke Skywalker <luke.skywalkder@office15r2.dev>"
$randomPeon2 = "Obiwan Kenobi <obiwan.kenobi@office15r2.dev>"
$randomPeon3 = "Anakin Skywalker <anakin.skywalkder@office15r2.dev>"
$randomPeon4 = "Leia Organa <leia.organa@office15r2.dev>"
$randomPeon5 = "Yoda <yoda@office15r2.dev>"
 
Send-MailMessage -SmtpServer $smtp -To @($to, $randomPeon1) -From $from -Subject ($subject + $subject + $subject) -Body $body -BodyAsHtml -Priority high -UseSsl:$false -Cc @($randomPeon2, $randomPeon3)   -Bcc @("test@test.co") -Attachments @("./README.md", "./start.js", "./screenshot.png")
