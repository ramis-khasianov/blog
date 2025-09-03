import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

import { RequestError, ValidationError } from "../http-errors";
import logger from "../logger";

// Response type determines output format: "api" for NextResponse.json, "server" for plain object
export type ResponseType = "api" | "server";

// Formats error responses consistently based on the context (API route vs server component)
const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  // Standard error response structure
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  // Return NextResponse for API routes, plain object for server components
  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

// Central error handler that processes different error types and formats responses
const handleError = (error: unknown, responseType: ResponseType = "server") => {
  // Handle custom RequestError (400, 404, etc.)
  if (error instanceof RequestError) {
    logger.error(
      { err: error },
      `${responseType.toUpperCase()} Error: ${error.message}`
    );

    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  // Handle Zod validation errors - convert to ValidationError format
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      z.flattenError(error).fieldErrors as Record<string, string[]>
    );

    logger.error(
      { err: error },
      `Validation Error: ${validationError.message}`
    );

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  // Handle generic JavaScript errors
  if (error instanceof Error) {
    logger.error(error.message);

    return formatResponse(responseType, 500, error.message);
  }

  // Fallback for unknown error types
  logger.error({ err: error }, "An unexpected error occurred");
  return formatResponse(responseType, 500, "An unexpected error occurred");
};

export default handleError;
