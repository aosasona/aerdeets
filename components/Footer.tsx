import graphqlClient from "@/utils/graphql.util";
import { gql } from "graphql-request";
import { useState, FC } from "react";
import Loader from "./Loader";
import Toast from "./Toast";

const Footer: FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    success: false,
    error: false,
  });

  // Get current year
  const year = new Date().getFullYear();

  // Form handler
  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    const query = gql`
      mutation ($email: String!) {
        createSubscriber(data: { email: $email }) {
          email
        }
      }
    `;

    graphqlClient
      .request(query, { email })
      .then((data) => {
        setEmail("");
        setStatus((prev) => ({ ...prev, success: true }));
        setLoading(false);
      })
      .catch((err) => {
        // console.error(err);
        setLoading(false);
        setStatus((prev) => ({ ...prev, error: true }));
      });
  };

  return (
    <>
      <div className="w-full lg:w-3/6 mx-auto bg-primary pt-6 pb-7 px-5 lg:px-6 mt-8">
        <h1 className="text-dark font-bold text-3xl lg:text-4xl w-5/6">
          Subscribe To Our Newsletter
        </h1>
        <div>
          <form onSubmit={handleSubmit} className="w-full flex my-6 lg:my-7">
            <input
              type="email"
              name="email"
              placeholder="john@doe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-neutral-900 text-base text-primary focus:outline-none placeholder-neutral-600 rounded-none px-3"
            />
            <button
              type="submit"
              name="submit"
              className="text-neutral-900 text-sm font-medium bg-secondary p-3 transition-all"
            >
              {loading ? <Loader /> : "Subscribe"}
            </button>
          </form>
        </div>
        <p className="text-dark text-xs text-opacity-80">
          Get updates on new articles, invites, and more. We promise we
          won&apos;t spam you.
        </p>
      </div>
      <footer className="text-xs text-center text-neutral-500 border-t-2 border-t-neutral-900 mt-8 py-6">
        &copy; {year} Aerdeets. All Rights Reserved
      </footer>

      {/* TOAST */}
      <Toast
        visible={status.error || status.success}
        type={status.success ? "success" : "error"}
        setStatus={setStatus}
      />
    </>
  );
};

export default Footer;
