import { joseContact as contact } from "@/config/jose-noguera";
import { OfficeGallery } from "./office-gallery";

export default function OfficePage() {
  const address =
    contact.address || contact.officeDisplay;

  const destination = encodeURIComponent(
    address.replace(/\n/g, ", "),
  );

  const directionsUrl =
    `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

  return (
    <OfficeGallery
      contact={contact}
      directionsUrl={directionsUrl}
    />
  );
}