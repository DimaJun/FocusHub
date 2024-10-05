import { Main } from 'pages/Main';
import { Route, Routes } from 'react-router-dom';

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
        </Routes>
    );
}
export default AppRouter;
