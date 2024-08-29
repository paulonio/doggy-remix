import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Image, ImageWrapper, TrendingPackageContent, TrendingPackageWrapper } from '../styled';

import Button from '@/components/button';
import HomePageScreen from '@/components/home-page-screen';
import ItemsView from '@/components/items-view';
import ProductItem from '@/components/product-item';
import Typography from '@/components/typography';
import { Dog, getDogs, parseResponse } from '@/utils/api';

export const meta: MetaFunction = () => {
  return [{ title: 'Doggy-remix' }, { name: 'description', content: 'Welcome to doggy-remix!' }];
};

export async function loader() {
  const dogs = await getDogs();

  return parseResponse(dogs);
}

export default function Home() {
  const data = useLoaderData<typeof loader>();

  const { spaPackage, trendingDescription, collars, carryOns } = data || {};

  return (
    <>
      <HomePageScreen />
      <ItemsView title="Trending Spa Package" isOneChild data-testid="spa-package-title">
        <TrendingPackageWrapper>
          <ImageWrapper $borderWidth="s" $borderColor="light">
            <Image src={spaPackage?.image_link} alt={spaPackage?.name} />
          </ImageWrapper>
          <TrendingPackageContent>
            <h3>{spaPackage?.name}</h3>
            <Typography size="m">{trendingDescription}</Typography>
            <Button to="/spa-services" background="secondary">
              See More Spa Packages
            </Button>
          </TrendingPackageContent>
        </TrendingPackageWrapper>
      </ItemsView>
      <ItemsView
        title="Dog Collars"
        isOneChild={collars?.length === 1}
        button={<Button to="/info">See More Dog Collars</Button>}
      >
        {collars?.map((collar: Dog) => {
          return <ProductItem dogInfo={collar} key={collar.name} />;
        })}
      </ItemsView>
      <ItemsView
        title="Animal Carry Ons"
        isOneChild={carryOns?.length === 1}
        button={<Button to="/info">See More Carry Ons</Button>}
      >
        {carryOns?.map((carryOn: Dog) => {
          return <ProductItem dogInfo={carryOn} key={carryOn.name} />;
        })}
      </ItemsView>
    </>
  );
}
