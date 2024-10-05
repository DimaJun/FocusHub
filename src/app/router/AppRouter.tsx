import { Board } from 'pages/Board';
import { Main } from 'pages/Main';
import { Route, Routes } from 'react-router-dom';

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/board' element={<Board />} />
        </Routes>
    );
}
export default AppRouter;
