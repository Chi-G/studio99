<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }}</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f4f0f0;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }

        .wrapper {
            width: 100%;
            padding: 40px 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(96, 10, 10, 0.08);
        }

        /* ---- Header ---- */
        .header {
            padding: 32px 16px 8px 16px;
            border-bottom: 1px solid #f0e8e8;
            text-align: left;
        }

        .header img {
            height: 36px;
            width: auto;
        }

        /* ---- Hero banner ---- */
        .hero {
            width: 600px;
            height: 392px;
            background-color: #fcf6f5;
            text-align: center;
            border-radius: 16px;
            overflow: hidden;
            margin: 0 auto;
        }
        .hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: 16px;
        }

        /* ---- Body content ---- */
        .content {
            padding: 16px 32px 16px 48px;
            width: 600px;
        }

        h1 {
            font-size: 18px;
            font-weight: 700;
            color: #2D1614;
            margin: 0 0 14px;
        }

        p {
            font-size: 15px;
            line-height: 1.5;
            color: #4A3E3D;
            margin: 0 0 10px;
        }

        /* ---- CTA button ---- */
        .button {
            display: inline-block;
            background-color: #600A0A;
            color: #ffffff !important;
            text-decoration: none;
            padding: 10px 24px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 15px;
            text-align: center;
            box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.15) inset,
                0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset;
            transition: opacity 0.2s ease;
            margin: 4px 0 16px 0;
        }

        .button:hover {
            opacity: 0.9;
        }

        .action {
            width: 100%;
            text-align: left;
        }

        /* ---- Footer ---- */
        .footer {
            background-color: #600A0A;
            padding: 32px 16px;
            text-align: left;
            color: #ffffff;
            width: 600px;
        }

        .footer-logo {
            margin-bottom: 18px;
        }

        .footer-logo img {
            height: 30px;
            width: auto;
        }

        .footer p {
            font-size: 12px;
            color: #e5b9b9;
            line-height: 1.6;
            margin: 0 0 8px;
        }

        .footer-divider {
            border: none;
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            margin: 18px 0;
        }

        .footer-bottom {
            font-size: 11px;
            color: #d4a0a0;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="container">
            <!-- Header -->
            <div class="header">
                <img src="data:image/jpeg;base64,{{ base64_encode(file_get_contents(resource_path('images/logo.jpeg'))) }}"
                    alt="STUDIO99" style="vertical-align: middle; margin-right: 8px; border-radius: 50%;" />
                <span style="font-size: 24px; font-weight: 900; color: #5B1013; vertical-align: middle;">STUDIO99</span>
            </div>

            <!-- Hero image -->
            <div class="hero">
                <img src="data:image/jpeg;base64,{{ base64_encode(file_get_contents(resource_path('images/mail-template.jpeg'))) }}"
                    alt="STUDIO99 Hero" />
            </div>

            <!-- Main content -->
            <div class="content" style="padding: 32px 32px 32px 48px; box-sizing: border-box; width: 600px;">
                {!! Illuminate\Mail\Markdown::parse($slot) !!}
                {!! $subcopy ?? '' !!}
            </div>

            <!-- Footer -->
            <div class="footer">
                <div style="margin-bottom: 16px; white-space: nowrap;">
                    <img src="data:image/jpeg;base64,{{ base64_encode(file_get_contents(resource_path('images/logo.jpeg'))) }}"
                        alt="STUDIO99"
                        style="height: 30px; width: auto; vertical-align: middle; margin-right: 8px; border-radius: 50%;" />
                    <span
                        style="font-size: 20px; font-weight: 900; color: #FFFFFF; vertical-align: middle;">STUDIO99</span>
                </div>
                <div style="text-align: left;">
                    <p style="margin-top: 0;">If you'd rather not receive this kind of email, you can unsubscribe or manage your email preferences.</p>
                    <hr class="footer-divider" />
                    <p class="footer-bottom">STUDIO99, 24B Ayomide oluruin Ajose adeogun street, Lagos Nigeria, 2223</p>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
