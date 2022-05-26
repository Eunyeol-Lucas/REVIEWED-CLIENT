import ProfileAPI from "@/api/profile";

export default {
  state: {
    userProfile: {},
  },
  getters: {
    userProfile: (state) => state.userProfile,
  },
  mutations: {
    setUserProfile(state, userProfileInfo) {
      state.userProfile = { ...state.userProfile, ...userProfileInfo };
    },
    setUserFollow(state) {
      state.userProfile.follow = !state.userProfile.follow;
      if (state.userProfile.follow) {
        state.userProfile.followedCount++;
      } else state.userProfile.followedCount--;
    },
  },
  actions: {
    async getUserProfile({ commit }, userId) {
      try {
        const response = await ProfileAPI.getProfile(userId);
        commit("setUserProfile", response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async toggleUserFollow({ commit }, { myUserId, targetUserId }) {
      try {
        await ProfileAPI.toggleFollow(myUserId, targetUserId);
        commit("setUserFollow");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
