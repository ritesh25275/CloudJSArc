import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

const SavedPropertiesPage = async () => {
  let bookmarks = [];

  try {
    // Connect to the database
    await connectDB();

    // Get the current session user
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    // Fetch bookmarks for the user
    const user = await User.findById(userId)
      .populate('bookmarks') // Populate bookmarks field
      .lean();

    bookmarks = user?.bookmarks || [];
  } catch (error) {
    console.error('Error fetching saved properties:', error.message);
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
