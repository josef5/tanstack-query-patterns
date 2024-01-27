import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RQSuperHeroPage from "./components/RQSuperHero.page";
import RQParallelQueriesPage from "./components/RQParallelQueries.page";
import RQDynamicParallelQueriesPage from "./components/RQDynamicParallelQueries.page";
import RQDependentQueriesPage from "./components/RQDependentQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/rq-dependent/"
              element={<RQDependentQueriesPage email="vishwas@example.com" />}
            />
            <Route
              path="/rq-dynamic-parallel/"
              element={<RQDynamicParallelQueriesPage heroIds={[1, 3]} />}
            />
            <Route path="/rq-parallel" element={<RQParallelQueriesPage />} />
            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQSuperHeroPage />}
            />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
