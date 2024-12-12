import PropertyEditForm from '@/components/PropertyEditForm';
import connectDB from '@/backend/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const PropertyEditPage = async ({ params }) => {
  let property = [];

  try {
    // Connect to the database
    await connectDB();

    const propertyDoc = await Property.findById(params.id).lean();
    property = convertToSerializeableObject(propertyDoc);
  } catch (error) {
    // Log any errors that occur
    console.error('Error fetching properties:', error.message);
  }

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
