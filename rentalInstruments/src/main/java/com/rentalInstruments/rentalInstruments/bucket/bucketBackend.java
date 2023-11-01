package com.rentalInstruments.rentalInstruments.bucket;

public enum bucketBackend {
    PROFILE_IMAGE ("1023c01-grupo6");
    private final String bucketBackend;

    bucketBackend(String bucketBackend) {
        this.bucketBackend = bucketBackend;
    }

    public String getBucketBackend() {
        return bucketBackend;
    }
}
