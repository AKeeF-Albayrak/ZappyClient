import { UAParser } from 'ua-parser-js';

export const getClientIp = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("IP alınamadı:", error);
    return "unknown";
  }
};

export const getUserAgent = (): string => {
  return window.navigator.userAgent;
};

export const getDeviceInfo = (): string => {
  const parser = new UAParser();
  const result = parser.getResult();
  return `${result.os.name} - ${result.browser.name} (${result.device.type || "Desktop"}) [UA: ${navigator.userAgent}]`;
};


