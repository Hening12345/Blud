import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";

  export const Config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.vixz.blud',
    projectId: '675eb13c000fc5a66cba',
    databaseId: '675eb4210030cf1d8d55',
    userCollectionId: '675eb46400131867383e',
    videoCollectionId : '675eb4bc0029a24641e9',
    storageId: '675eb80100311937c38c'
}

// Init your React Native SDK
const client = new Client();

  client
      .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
      .setProject(Config.projectId) // Your project ID
      .setPlatform(Config.platform) // Your application ID or bundle ID.

  const account = new Account(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

export const createUser = async (
    email: string,
    password: string,
    userName: string
    ) => {
        try {
            const newAccount = await account.create(
                ID.unique(),
                email,
                password,
                userName
                );

                if (!newAccount) throw Error;

            const avatarUrl = avatars.getInitials(userName);

            await signInUser(email, password);

            const newUser = await databases.createDocument(
                Config.databaseId,
                Config.userCollectionId,
                ID.unique(),
                {
                    accountId: newAccount.$id,
                    email,
                    username: userName,
                    avatar: avatarUrl,
                }
            );

            return newUser;
        } catch (err) {
            console.log(err);
        }
}

export async function signInUser(email: string, password: string) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (err) {
      console.error("Error in signin user:", err);
      throw new Error((err as Error)?.message || "An unexpected error occurred");
    }
}

export async function signOutUser() {
    try {
      await account.deleteSession("current");
    } catch (err) {
      console.error("Error in signout user:", err);
      throw new Error((err as Error)?.message || "An unexpected error occurred");
    }
}

export async function getCurrentUser() {
    try {
      const currentAccount = await account.get();
  
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        Config.databaseId,
        Config.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (err) {
      // console.error("Error in getUser:", err);
      throw new Error((err as Error)?.message || "An unexpected error occurred");
    }
}

export const getAllPosts = async () => {
    try {
      const posts = await databases.listDocuments(
        Config.databaseId,
        Config.videoCollectionId,
        [Query.orderDesc("$createdAt")]
      );
  
      return posts.documents;
    } catch (err) {
      console.error("Error in getPosts:", err);
      throw new Error((err as Error)?.message || "An unexpected error occurred");
    }
}

export const getTrendingPosts = async () => {
    try {
      const posts = await databases.listDocuments(
        Config.databaseId,
        Config.videoCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      return posts.documents;
    } catch (err) {
      console.error("Error in getPosts:", err);
      throw new Error((err as Error)?.message || "An unexpected error occurred");
    }
}

export async function searchPosts(query: any) {
    try {
      const posts = await databases.listDocuments(
        Config.databaseId,
        Config.videoCollectionId,
        [Query.search("title", query)]
      );
  
      if (!posts) throw new Error("Something went wrong");
  
      return posts.documents;
    } catch (err) {
      console.error("Error in getPosts:", err);
      throw new Error((err as Error)?.message || "An unexpected error occurred");
    }
}

export async function getUserPosts(userId:any) {
    try {
      console.log("heyyyyy")
      const posts = await databases.listDocuments(
        Config.databaseId,
        Config.videoCollectionId,
        [Query.equal("creator", userId), Query.orderDesc('$createdAt')]
      );
  
      return posts.documents;
    } catch (err) {
      console.error("Error in getPosts:", err);
      throw new Error((err as Error)?.message || "An unexpected error occurred");
    }
}

export async function uploadFile(file:any, type:any) {
    if (!file) return;
  
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
  
    try {
      const uploadedFile = await storage.createFile(
        Config.storageId,
        ID.unique(),
        asset
      );
  
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (err) {
      console.error("Error in getPosts:", err);
      throw new Error((err as Error)?.message || "An unexpected error occurred");
    }
}

export async function getFilePreview(fileId:any, type:any) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(Config.storageId, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          Config.storageId,
          fileId,
          2000,
          2000,
          undefined,
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (err) {
      console.error("Error in getPosts:", err);
      throw new Error((err as Error)?.message || "An unexpected error occurred");
    }
}

export async function createVideoPost(form:any) {
    try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
      ]);
  
      const newPost = await databases.createDocument(
        Config.databaseId,
        Config.videoCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: form.userId,
        }
      );
  
      return newPost;
    } catch (err) {
      console.error("Error in getPosts:", err);
      throw new Error((err as Error)?.message || "An unexpected error occurred");
    }
}

export async function deleteVideo(videoId: string, fileId: string) {
  try {
    await databases.deleteDocument(Config.databaseId, Config.videoCollectionId, videoId);

    await storage.deleteFile(Config.storageId, fileId);

    console.log("Video dan file berhasil dihapus.");
  } catch (err) {
    console.error("Error in deleteVideo:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
}
