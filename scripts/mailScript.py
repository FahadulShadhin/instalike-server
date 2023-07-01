import ssl
import smtplib
from email.message import EmailMessage
import sys

email_sender = sys.argv[1]
email_password = sys.argv[2]
email_receiver = sys.argv[3]

email_subject = 'Account created successfully'
email_body = '''
  Hello,
  Your account is created successfully.
  You can now login to your account: https://instalikedomain/login/
'''

em = EmailMessage()
em['From'] = email_sender
em['To'] = email_receiver
em['Subject'] = email_subject
em.set_content(email_body)

context = ssl.create_default_context()

with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
    smtp.login(email_sender, email_password)
    smtp.sendmail(email_sender, email_receiver, em.as_string())
