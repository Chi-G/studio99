@php
    // Use the live production domain when testing locally so that Mailtrap can retrieve the images online
    $baseUrl = config('app.url') === 'http://localhost' ? 'https://studio99-web.onrender.com' : config('app.url');
    $logoBlack = $baseUrl . '/logo_black.png';
    $logoWhite = $baseUrl . '/logo_white.png';
    $heroImage = $baseUrl . '/mail-template.jpeg';
@endphp
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
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(96, 10, 10, 0.08);
        }

        /* ---- Header ---- */
        .header {
            padding: 24px;
            border-bottom: 1px solid #f0e8e8;
            text-align: left;
        }

        .header img {
            height: 32px;
            width: auto;
            display: block;
            border: 0;
        }

        /* ---- Hero banner ---- */
        .hero {
            width: 100%;
            max-width: 600px;
            height: auto;
            background-color: #fcf6f5;
            text-align: center;
            overflow: hidden;
            margin: 0 auto;
        }
        .hero img {
            width: 100%;
            height: auto;
            display: block;
            border: 0;
        }

        /* ---- Body content ---- */
        .content {
            padding: 32px 24px;
            width: 100%;
            max-width: 600px;
            box-sizing: border-box;
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
            padding: 32px 24px;
            text-align: left;
            color: #ffffff;
            width: 100%;
            max-width: 600px;
            box-sizing: border-box;
        }

        .footer-logo {
            margin-bottom: 18px;
        }

        .footer-logo img {
            height: 28px;
            width: auto;
            display: block;
            border: 0;
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
            margin: 0;
        }

        /* ---- Media Queries ---- */
        @media only screen and (max-width: 600px) {
            .wrapper {
                padding: 12px 0 !important;
            }
            .container {
                border-radius: 0 !important;
                box-shadow: none !important;
            }
            .header {
                padding: 16px !important;
            }
            .content {
                padding: 24px 16px !important;
            }
            .footer {
                padding: 24px 16px !important;
            }
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="container">
            <!-- Header -->
            <div class="header">
                <a href="{{ config('app.url') }}" style="display: inline-block; text-decoration: none;">
                    <img src="{{ $logoBlack }}" alt="" />
                </a>
            </div>

            <!-- Hero image -->
            <div class="hero">
                <img src="{{ $heroImage }}" alt="" />
            </div>

            <!-- Main content -->
            <div class="content" style="box-sizing: border-box; width: 100%; max-width: 600px;">
                {!! Illuminate\Mail\Markdown::parse($slot) !!}
                {!! $subcopy ?? '' !!}
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="footer-logo">
                    <a href="{{ config('app.url') }}" style="display: inline-block; text-decoration: none;">
                        <img src="{{ $logoWhite }}" alt="" />
                    </a>
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
