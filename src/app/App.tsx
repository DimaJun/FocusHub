import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from 'widgets/Header';
import AppRouter from './router/AppRouter';

function App() {
    return (
        <Router>
            <div className='font-rubik h-full grid grid-rows-[42.5px_1fr] overflow-x-hidden'>
                <Header />
                <div className='p-3 overflow-x-auto'>
                    <AppRouter />
                </div>
            </div>
        </Router>
    );
}

export default App;
