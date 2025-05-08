"use client";

import { isAuthenticated as isAuthenticatedClient } from "@/utils/supabase/client-session";
import { useEffect, useState } from "react";
import { CreatePostModal } from "../modals/create-post-modal";
import { SignInModal } from "../modals/sign-in-modal";
import { Button } from "../ui/button";
import { BoardPost } from "./board-post";
// import { BoardSearch } from "./board-search";

type BoardListProps = {
  popularPosts: {
    post_id: number;
    has_voted: boolean;
    title: string;
    url: string;
    slug: string;
    content: string;
    created_at: string;
    vote_count: number;
    user_slug: string;
  }[];
};

export default function BoardList({ popularPosts }: BoardListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isAuthenticatedClient());
  }, []);

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      setIsSignInModalOpen(true);
      return;
    }

    setIsOpen(true);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <h2 className="text-xl">Trending in Cursor Today</h2>
          <p className="text-sm text-[#878787] mt-1">
            Explore what the community is talking about
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-full h-8 border-border"
          onClick={handleCreatePost}
        >
          Create Post
        </Button>
      </div>

      {/* <BoardSearch /> */}

      <div className="my-14 space-y-10">
        {popularPosts && popularPosts.length > 0 ? (
          popularPosts.map((post, index) => (
            <BoardPost key={post.post_id} index={index} {...post} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No trending posts found at the moment.
          </p>
        )}
      </div>

      <CreatePostModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <SignInModal
        redirectTo="/board"
        isOpen={isSignInModalOpen}
        setIsOpen={setIsSignInModalOpen}
      />
    </div>
  );
}
