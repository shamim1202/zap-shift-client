import quoteImg from "../../../assets/reviewQuote.png";
const ReviewCard = ({ reviewData }) => {
  const { review, userName, user_email, user_photoURL } = reviewData;
  return (
    <div class="max-w-sm w-full bg-white shadow-md rounded-xl p-6 space-y-4">
      <img src={quoteImg} alt="" />

      <p class="text-gray-600">{review}</p>

      <div class="border-t-3 border-dashed pt-4 border-secondary">
        <div class="flex items-center gap-3">
          <div>
            <img
              class="w-10 h-10 rounded-full"
              src={user_photoURL}
              alt={userName}
            />
          </div>
          <div>
            <p class="font-semibold text-gray-900">{userName}</p>
            <p class="text-sm text-gray-500">{user_email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
