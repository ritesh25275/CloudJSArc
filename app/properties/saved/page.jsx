import PropertyCard from '@/components/PropertyCard';

const fetchSavedProperties = async () => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/properties/saved`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch saved properties');
  }

  const data = await response.json();
  return data.bookmarks;
};

const SavedPropertiesPage = async () => {
  let bookmarks = [];

  try {
    bookmarks = await fetchSavedProperties();
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
