import { type Feature } from '@prisma/client'

export function hasFeature(userFeatures: Feature[], neededFeaturesOR: Feature[]) {
  for (const userFeature of userFeatures) {
    for (const neededFeature of neededFeaturesOR) {
      if (userFeature === neededFeature) {
        return true
      }
    }
  }
  return false
}

export function canAccessOrganizationPage(userFeatures: Feature[]) {
  return hasFeature(userFeatures, [
    'BILLING',
    'DELETE_USERS',
    'EDIT_ORG',
    'EDIT_USERS',
    'INVITE_USERS',
  ])
}

export const featureToHuman: Record<Feature, string> = {
  BILLING: 'Accès facturation',
  EDIT_ORG: 'Gérer les informations entreprise',
  INVITE_USERS: 'Inviter de nouveaux membres',
  EDIT_USERS: 'Modifier les accès des membres',
  DELETE_USERS: 'Supprimer des membres',
}
