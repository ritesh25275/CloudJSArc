import connectDB from '@/backend/config/database';
import Property from '@/models/Property';
import Link from 'next/link';
import PropertyCard from './PropertyCard';

const HomeProperties = async () => {
  // await connectDB();

  let recentProperties = [];
  try {
    // Connect to the database
    await connectDB();

    // Get the 3 latest properties
    recentProperties = await Property.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

  } catch (error) {
    // Log any errors that occur
    console.error('Error fetching properties:', error.message);
  }


  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
