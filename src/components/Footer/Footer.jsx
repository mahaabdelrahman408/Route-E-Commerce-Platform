import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-100 px-6 py-10 text-sm text-gray-700">
      <div className="mx-auto max-w-7xl">

        {/* Download App */}
        <div>
          <h2 className="text-xl font-medium text-gray-900">
            Get The FreshCart App
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            We will send you a link, open it on your phone to download the app.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email .."
              className="h-9 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-500"
            />

            <button
              type="button"
              className="h-9 rounded-lg bg-green-600 px-8 font-semibold text-white transition hover:bg-green-700"
            >
              Share App Link
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-gray-300"></div>

        {/* Payment + Apps */}
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">

          {/* Payment Partners */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">
              Payment Partners
            </span>

         <div className="flex items-center gap-2 text-xs">

  <a href="/amazon-pay">
    <img
      src="/amazonpay-DDt8kHan.svg"
      alt="Amazon Pay"
    />
  </a>

  <a href="/american-express">
    <img
      src="/american-express-F7V82bnT.svg"
      alt="American Express"
    />
  </a>

  <a href="/mastercard">
    <img
      src="/mastercard-CokDZD99.svg"
      alt="Mastercard"
    />
  </a>

  <a href="/paypal">
    <img
      src="/download.svg"
      alt="PayPal"
    />
  </a>

  <a href="/visa">
    <img
      src="/download (1).svg"
      alt="Visa"
    />
  </a>

</div>
          </div>

          {/* Download Apps */}
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <span className="font-medium text-gray-900">
              Get deliveries with FreshCart
            </span>

            <div className="flex gap-2">

            <img src="googleplay-btn-CwMI-V7g.svg" alt="" />

             
                <img src="appstore-btn-TmL4qmIb.svg" alt="" />
             

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-300"></div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          {/* Copyright */}
          <div className="text-xs text-gray-400">
            <p>
              © 2022 - 2024 FreshCart e-Commerce HTML Template. All rights
              reserved.
            </p>

            <p className="mt-1">
              Powered by{" "}
              <span className="font-semibold text-green-600">
                Codescandy
              </span>
            </p>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-2">

            <span className="mr-1 text-xs text-gray-400">
              Follow us on
            </span>

        <a
  href="https://www.facebook.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex h-6 w-6 items-center justify-center rounded-md border border-gray-400 text-gray-500 transition hover:text-blue-600"
>
  <FontAwesomeIcon icon={faFacebook} />
</a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-6 w-6 items-center justify-center rounded-md border border-gray-400 text-gray-500 transition hover:text-blue-400"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-6 w-6 items-center justify-center rounded-md border border-gray-400 text-gray-500 transition hover:text-pink-500"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}