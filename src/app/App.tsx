import { Header } from "widgets/Header";
import AppRouter from "./router/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className='font-rubik'>
                <Header />
                <div>
                    <AppRouter />
                </div>
            </div>
        </Router>
    );
}

export default App;
