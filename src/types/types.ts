export interface IWall {
  id: number;
  title: string;
  url: string;
}

export interface ILikedStore {
  liked: IWall[];
  addToLiked: (wall: IWall) => void;
  removeFromLiked: (wall: IWall) => void;
}

export interface IWallStore {
  isDownloaded: boolean;
  setIsDownloaded: (isDownloaded: boolean) => void;
  toastVisible: boolean;
  setToastVisible: (toastVisible: boolean) => void;
}
