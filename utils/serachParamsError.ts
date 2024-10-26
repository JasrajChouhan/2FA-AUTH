const searchParamError = (urlError: string) => {
  switch (urlError) {
    case 'OAuthAccountNotLinked':
      return 'OAuthAccountNotLinked';
    case 'AccessDenied':
      return "AccessDenied"
  }
}

export default searchParamError;

