import { Header } from "widgets/Header";
import AppRouter from "./router/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className='font-rubik h-full grid grid-rows-[42.5px_1fr]'>
                <Header />
                <div className="p-3">
                    <AppRouter />
                </div>
            </div>
        </Router>
    );
}

export default App;
