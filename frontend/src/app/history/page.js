"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/temp";

export default function HistoryPage() {

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/reviews/history"
      );

      const data = await response.json();

      setReviews(data);

    } catch (error) {

      console.log(error);

      alert("Failed to load history");

    }

    setLoading(false);
  }

  return (

    <ProtectedRoute>

      <main className="min-h-screen bg-black text-white flex">

        <Sidebar />

        <section className="flex-1 p-10 overflow-auto">

          <div className="mb-10">

            <h1 className="text-5xl font-bold mb-3">
              Review History
            </h1>

            <p className="text-gray-400">
              Previous AI code reviews and analysis history.
            </p>

          </div>

          {
            loading
              ? (
                <p className="text-gray-400">
                  Loading history...
                </p>
              )
              : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                  {
                    reviews.map((review) => (

                      <div
                        key={review.id}
                        className="bg-gray-950 border border-gray-800 rounded-3xl p-8"
                      >

                        <div className="flex justify-between items-center mb-6">

                          <h2 className="text-2xl font-bold">
                            {review.language.toUpperCase()}
                          </h2>

                          <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl font-bold">
                            {review.review_result.score}/10
                          </div>

                        </div>

                        <div className="mb-6">

                          <h3 className="text-xl font-semibold mb-2">
                            Summary
                          </h3>

                          <p className="text-gray-300">
                            {review.review_result.summary}
                          </p>

                        </div>

                        <div className="mb-6">

                          <h3 className="text-xl font-semibold mb-2">
                            Code
                          </h3>

                          <pre className="bg-black border border-gray-800 p-4 rounded-2xl overflow-auto text-green-400 text-sm">
                            {review.code}
                          </pre>

                        </div>

                        <div>

                          <h3 className="text-xl font-semibold mb-2 text-red-400">
                            Security Issues
                          </h3>

                          <ul className="list-disc pl-6 text-gray-300 space-y-2">

                            {
                              review.review_result.security_issues?.map((issue, index) => (
                                <li key={index}>
                                  {issue}
                                </li>
                              ))
                            }

                          </ul>

                        </div>

                      </div>

                    ))
                  }

                </div>
              )
          }

        </section>

      </main>

    </ProtectedRoute>
  );
}