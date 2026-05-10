from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
import smtplib

def format_date(date_to_change):
    months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
    ]

    date = date_to_change

    month = months[date.month - 1]
    day = date.day
    year = date.year

    return f"{month} {day},{year}"


def send_email(receiver_email, subject,message_body, game_data):
    sender_email = os.getenv("SMTP_FROM_EMAIL", "")
    sender_password = os.getenv("SMTP_PASSWORD", "")
    smtp_host = os.getenv("SMTP_HOST", "smtp-mail.outlook.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))

    # Crear un objeto MIMEMultipart para el correo electrónico
    message = MIMEMultipart("alternative")
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    
    header = "Cabecera"

    # Crear el contenido HTML del correo electrónico
    html_content = f"""
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"><!--<![endif]-->
	<style>
		* {{
			box-sizing: border-box;
		}}

		body {{
			margin: 0;
			padding: 0;
		}}

		a[x-apple-data-detectors] {{
			color: inherit !important;
			text-decoration: inherit !important;
		}}

		#MessageViewBody a {{
			color: inherit;
			text-decoration: none;
		}}

		p {{
			line-height: inherit
		}}

		.desktop_hide,
		.desktop_hide table {{
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}}

		.image_block img+div {{
			display: none;
		}}

		.menu_block.desktop_hide .menu-links span {{
			mso-hide: all;
		}}

		@media (max-width:700px) {{

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {{
				display: inline-block !important;
			}}

			.icons-inner {{
				text-align: center;
			}}

			.icons-inner td {{
				margin: 0 auto;
			}}

			.mobile_hide {{
				display: none;
			}}

			.row-content {{
				width: 100% !important;
			}}

			.stack .column {{
				width: 100%;
				display: block;
			}}

			.mobile_hide {{
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}}

			.desktop_hide,
			.desktop_hide table {{
				display: table !important;
				max-height: none !important;
			}}
		}}
	</style>
</head>

<body style="background-color: #000000; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000;">
	<tbody>
		<tr>
			<td>
				<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
					<tbody>
						<tr>
							<td>
								<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
									<tbody>
										<tr>
											<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
												<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
												<div class="spacer_block block-2" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
												<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
													<tr>
														<td class="pad" style="padding-bottom:30px;padding-left:25px;padding-right:25px;padding-top:10px;">
															<div style="color:#e5e5e5;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:18px;line-height:180%;text-align:center;mso-line-height-alt:32.4px;">
																<p style="margin: 0; word-break: break-word;"><span>{message_body}</span></p>
															</div>
														</td>
													</tr>
												</table>
												<div class="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
												<div class="spacer_block block-6" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-position: center top;">
					<tbody>
						<tr>
							<td>
								<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #000000; width: 680px; margin: 0 auto;" width="680">
									<tbody>
										<tr>
											<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
												<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
													<tr>
														<td class="pad" style="width:100%;">
															<div class="alignment" align="center" style="line-height:10px">
																<div style="max-width: 680px;"><a href="http://www.example.com" target="_blank" style="outline:none" tabindex="-1"><img src={game_data['cover']} style="display: block; height: auto; border: 0; width: 100%;" width="680" alt="Soldier Walking Out" title="Soldier Walking Out"></a></div>
															</div>
														</td>
													</tr>
												</table>
												<div class="spacer_block block-2" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
												<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
													<tr>
														<td class="pad" style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
															<div style="color:#e5e5e5;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:38px;line-height:120%;text-align:center;mso-line-height-alt:45.6px;">
																<p style="margin: 0; word-break: break-word;"><span>{game_data['title']}</span></p>
															</div>
														</td>
													</tr>
												</table>
												<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
													<tr>
														<td class="pad" style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
															<div style="color:#e5e5e5;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:38px;line-height:120%;text-align:center;mso-line-height-alt:45.6px;">
																<p style="margin: 0; word-break: break-word;"><span>{format_date(game_data['release_date'])}</span></p>
															</div>
														</td>
													</tr>
												</table>
												<div class="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
												<div class="spacer_block block-6" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
												<table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
													<tr>
														<td class="pad">
															<div class="alignment" align="center">
																<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="10%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #DE6428;"><span>&#8202;</span></td>
																	</tr>
																</table>
															</div>
														</td>
													</tr>
												</table>
												<table class="paragraph_block block-8" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
													<tr>
														<td class="pad" style="padding-bottom:30px;padding-left:25px;padding-right:25px;padding-top:10px;">
															<div style="color:#e5e5e5;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:18px;line-height:180%;text-align:center;mso-line-height-alt:32.4px;">
																<p style="margin: 0; word-break: break-word;"><span>{game_data['description']}</span></p>
															</div>
														</td>
													</tr>
												</table>
												<div class="spacer_block block-9" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
					<tbody>
						<tr>
							<td>
								<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
									<tbody>
										<tr>
											<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
												<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
					<tbody>
						<tr>
							<td>
								<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
									<tbody>
										<tr>
											<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
												<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000;">
					<tbody>
						<tr>
							<td>
								<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #e5e5e5; width: 680px; margin: 0 auto;" width="680">
									<tbody>
										<tr>
											<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
												<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
												<table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
													<tr>
														<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;">
															<div class="alignment" align="center">
																<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="65%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px dotted #e5e5e5;"><span>&#8202;</span></td>
																	</tr>
																</table>
															</div>
														</td>
													</tr>
												</table>
												<div class="spacer_block block-3" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
												<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
													<tr>
														<td class="pad" style="padding-bottom:30px;padding-left:25px;padding-right:25px;padding-top:10px;">
															<div style="color:#e5e5e5;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:30px;line-height:180%;text-align:center;mso-line-height-alt:54px;">
																<p style="margin: 0; word-break: break-word;"><strong>PLATAFORMA</strong></p>
															</div>
														</td>
													</tr>
												</table>
												<table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
													<tr>
														<td class="pad" style="padding-bottom:30px;padding-left:25px;padding-right:25px;padding-top:10px;">
															<div style="color:#e5e5e5;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:18px;line-height:180%;text-align:center;mso-line-height-alt:32.4px;">
																<p style="margin: 0; word-break: break-word;"><span>¿No sabes a qué jugar? Echa un vistazo a nuestra web de cíticas ;)</span></p>
															</div>
														</td>
													</tr>
												</table>
												<table class="social_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
													<tr>
														<td class="pad" style="text-align:center;padding-right:0px;padding-left:0px;">
															<div class="alignment" align="center">
																<table class="social-table" width="210px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
																	<tr>
																		<td style="padding:0 5px 0 5px;"><a href="https://www.instagram.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
																		<td style="padding:0 5px 0 5px;"><a href="https://www.facebook.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/facebook@2x.png" width="32" height="32" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
																		<td style="padding:0 5px 0 5px;"><a href="https://www.twitter.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/twitter@2x.png" width="32" height="32" alt="Twitter" title="Twitter" style="display: block; height: auto; border: 0;"></a></td>
																		<td style="padding:0 5px 0 5px;"><a href="https://www.youtube.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/youtube@2x.png" width="32" height="32" alt="YouTube" title="YouTube" style="display: block; height: auto; border: 0;"></a></td>
																	</tr>
																</table>
															</div>
														</td>
													</tr>
												</table>
												<table class="divider_block block-7" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
													<tr>
														<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;">
															<div class="alignment" align="center">
																<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="65%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px dotted #FFFFFF;"><span>&#8202;</span></td>
																	</tr>
																</table>
															</div>
														</td>
													</tr>
												</table>
												<table class="menu_block block-8" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
													<tr>
														<td class="pad" style="color:#e5e5e5;font-family:inherit;font-size:14px;text-align:center;">
															<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																<tr>
																	<td class="alignment" style="text-align:center;font-size:0px;">
																		<div class="menu-links"><!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style=""><tr style="text-align:center;"><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px"><![endif]--><a href="http://www.example.com" target="_self" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;display:inline-block;color:#e5e5e5;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:14px;text-decoration:none;letter-spacing:normal;">Unsubscribe</a><!--[if mso]></td><td><![endif]--><span class="sep" style="font-size:14px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;color:#e5e5e5;">|</span><!--[if mso]></td><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px"><![endif]--><a href="http://www.example.com" target="_self" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;display:inline-block;color:#e5e5e5;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:14px;text-decoration:none;letter-spacing:normal;">Help & Contact</a><!--[if mso]></td><td><![endif]--><span class="sep" style="font-size:14px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;color:#e5e5e5;">|</span><!--[if mso]></td><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px"><![endif]--><a href="http://www.example.com" target="_self" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;display:inline-block;color:#e5e5e5;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:14px;text-decoration:none;letter-spacing:normal;">Privacy Notice</a><!--[if mso]></td><td><![endif]--><span class="sep" style="font-size:14px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;color:#e5e5e5;">|</span><!--[if mso]></td><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px"><![endif]--><a href="http://www.example.com" target="_self" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;display:inline-block;color:#e5e5e5;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:14px;text-decoration:none;letter-spacing:normal;">View Online</a><!--[if mso]></td><![endif]--><!--[if mso]></tr></table><![endif]--></div>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
												<div class="spacer_block block-9" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table><!-- End -->
</body>

</html>
    """

    html_part = MIMEText(html_content, "html")

    # Adjuntar la parte HTML al correo electrónico
    message.attach(html_part)

    # Iniciar una conexión con el servidor SMTP de Outlook
    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.ehlo()
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        server.quit()

    print("Correo electrónico enviado exitosamente a", receiver_email)
