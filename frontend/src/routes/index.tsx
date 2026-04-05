import {createBrowserRouter, Navigate} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.tsx";
import Adverts from "../pages/Adverts.tsx"
import DetailedAdvert from "../pages/DetailedAdvert.tsx"
import EditAdvert from "../pages/EditAdvert.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/ads" replace={true} />
            },
            {
                path: "/ads",
                element: <Adverts />
            },
            {
                path: "/ads/:id/edit",
                element: <EditAdvert />
            },
            {
                path: "/ads/:id",
                element: <DetailedAdvert />
            },
        ]
    }
])
