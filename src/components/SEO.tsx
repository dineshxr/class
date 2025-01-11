import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export function SEO({
  title = 'Free Classroom Tools for Teachers | ClassTool.org',
  description = 'Free educational tools for teachers including random name picker, group generator, classroom timer, and more. Essential classroom management tools to enhance your teaching experience.',
  keywords = ['classroom tools', 'class tools', 'classtools', 'teacher tools', 'teaching tools', 'education tools'],
  canonicalUrl = 'https://classtool.org',
  ogImage = 'https://classtool.org/og-image.png'
}: SEOProps) {
  const defaultKeywords = ['classroom tools', 'class tools', 'classtools', 'teacher tools', 'teaching tools', 
    'education tools', 'classroom management', 'teaching resources', 'teacher resources', 'free teaching tools'];
  
  const allKeywords = [...new Set([...defaultKeywords, ...(keywords || [])])];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}
