import Error from 'next/error';

export function UserNotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Error
        statusCode={421}
        title="Brugeren findes ikke, venligst prøve at logge ind igen"
      />
    </div>
  );
}
