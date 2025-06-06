import React, { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import LoadingSpinner from './common/components/LoadingSpinner';
const AppLayout = React.lazy(() => import('./layout/AppLayout'))
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"))
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"))
const SearchWithPage = React.lazy(() => import("./pages/SearchWithPage/SearchWithPage"))
const PlaylistPage = React.lazy(() => import("./pages/PlaylistPage/Playlist"))
const PlaylistDetailPage = React.lazy(() => import("./pages/PlaylistDetailPage/PlaylistDetailPage"))
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage/NotFoundPage"))
const CallbackPage = React.lazy(() => import("./pages/CallbackPage/CallbackPage"))


// 0. 사이드바 있어야 함. (플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 검색 페이지 /search
// 3. 검색 결과 페이지 /search/keyword
// 4. 플레이리스트 디테일 페이지 /playlist/:id
// 5. (모바일버전) 플레이리스트 보여주는 페이지 /playlist



function App() {

  return (
    <Suspense fallback={<LoadingSpinner text="Loading Sportify..." />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithPage />} />
          <Route path="playlist" element={<PlaylistPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
        </Route>
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
